﻿using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;

namespace LogowanieAPI.Exceptions
{
    public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> logger = logger;

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext, 
            Exception exception, 
            CancellationToken cancellationToken)
        {
            var traceId = Activity.Current?.Id ?? httpContext.TraceIdentifier;

            logger.LogError(
                exception,
                "Could not process a request on machine {MachineName}. TraceId:{TraceId}",
                Environment.MachineName,
                traceId
                );

            var (statusCode, title) = MapException(exception);

            await Results.Problem(
                title: title,
                statusCode: statusCode,
                extensions: new Dictionary<string, object?>
                {
                    { "traceId",traceId }
                }

                ).ExecuteAsync(httpContext);

            return true;
        }

        private static (int StatusCode,string Title) MapException(Exception exception)
        {
            return exception switch
            {
                JsonException => (StatusCodes.Status400BadRequest, exception.Message),
                _ => (StatusCodes.Status500InternalServerError, "Internal Server Error")
            };
        }
    }
}
