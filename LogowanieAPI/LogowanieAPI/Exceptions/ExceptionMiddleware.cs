using System.Net;
using System.Runtime.InteropServices;
using System.Text.Json;
using FluentValidation;
using LogowanieAPI.Model.DTO;
using LogowanieAPI.Exceptions;

namespace LogowanieAPI.Exceptions
{
    public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        private readonly RequestDelegate _next = next;
        private readonly ILogger<ExceptionMiddleware> _logger = logger;

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ValidationException vex)
            {
                _logger.LogError(vex, "Validation error occurred");
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Response.ContentType = "application/json";

                var errors = vex.Errors
                    .GroupBy(e => e.PropertyName)
                    .ToDictionary(
                        g => g.Key,
                        g => g.Select(e => e.ErrorMessage).ToArray()
                    );

                var response = new ApiResponse<Dictionary<string, string[]>>(false, "Validation errors", errors);
                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
            }
            catch (CustomModelException ex)
            {
                _logger.LogError(ex, "Unexpected error occurred");
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Response.ContentType = "application/json";

                var response = new ApiResponse<Dictionary<string, List<string>>>(false, ex.Message, ex.ModelState);
                await context.Response.WriteAsync(JsonSerializer.Serialize(response));

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error occurred");
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";

                var result = new ApiResponse<string>(false, "Something went wrong. Please try again later.", ex.Message);
                await context.Response.WriteAsync(JsonSerializer.Serialize(result));
            }
        }
    }
}
