using System.Text.RegularExpressions;
using LogowanieAPI.Model.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace LogowanieAPI.Exceptions
{
    public class ValidationFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var errors = new Dictionary<string, List<string>>();

                foreach (var entry in context.ModelState)
                {
                    var key = entry.Key;
                    var messages = entry.Value.Errors.Select(e => e.ErrorMessage).ToList();

                    if (!messages.Any()) continue;

                    
                    if (string.IsNullOrWhiteSpace(key) || key == "$" || key == "Model")
                    {
                        
                        foreach (var message in messages)
                        {
                            var props = ExtractPropertyNamesFromMessage(message);
                            foreach (var prop in props)
                            {
                                if (!errors.ContainsKey(prop))
                                    errors[prop] = new List<string>();

                                errors[prop].Add(GetLocalizedError(prop));
                            }
                        }
                    }
                    else
                    {
                        var cleanKey = key.Split('.').Last();
                        if (!errors.ContainsKey(cleanKey))
                            errors[cleanKey] = new List<string>();

                        errors[cleanKey].AddRange(messages);
                    }
                }

                throw new CustomModelException("Validation failed", errors);
            }
        }

        List<string> ExtractPropertyNamesFromMessage(string message)
        {
            var match = Regex.Match(message, @"including:\s*(.+)");
            if (!match.Success) return new List<string> { "Model" };

            return match.Groups[1].Value
                .Split(',')
                .Select(p => p.Trim().Trim('\'', '"', '.', ' '))
                .Where(p => !string.IsNullOrWhiteSpace(p))
                .Select(Capitalize)
                .ToList();
        }

        string Capitalize(string input)
        {
            return string.IsNullOrEmpty(input) ? input :
                char.ToUpper(input[0]) + input.Substring(1);
        }

        string GetLocalizedError(string property)
        {
            return $"Pole {property} jest wymagane";
        }
    }
}
