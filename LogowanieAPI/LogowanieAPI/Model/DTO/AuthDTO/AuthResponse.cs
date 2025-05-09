namespace LogowanieAPI.Model.DTO.AuthDTO
{
    public class AuthResponse
    {
        public bool? Success { get; set; }
        public string? Message { get; set; }
        public string? Token { get; set; }

        public AuthResponse() { }
        public AuthResponse(bool Success, string message,string token) { 
            this.Success = Success;
            this.Message = message;
            this.Token = token;
        }
        public AuthResponse(bool Success, string message)
        {
            this.Success = Success;
            this.Message = message;
        }
    }
}
