namespace PortalAPI.Data
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; } // Czy operacja się powiodła?
        public string Message { get; set; } // Wiadomość zwrotna
        public T Data { get; set; } // Zwracane dane (mogą być dowolnym typem)

        public ApiResponse(bool success, string message, T data = default)
        {
            Success = success;
            Message = message;
            Data = data;
        }
    }
}
