using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace LogowanieAPI.Exceptions
{
    public class CustomModelException : Exception
    {
        public Dictionary<string, List<string>> ModelState = new Dictionary<string, List<string>>();
        public CustomModelException() { }

        public CustomModelException(string message) : base(message) { }

        public CustomModelException(String message, Dictionary<string, List<string>> modelState) : base(message)
        {
            this.ModelState = modelState;
        }
    }
}
