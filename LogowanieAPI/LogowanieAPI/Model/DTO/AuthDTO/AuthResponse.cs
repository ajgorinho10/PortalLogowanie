namespace LogowanieAPI.Model.DTO.AuthDTO
{
    public class AuthResponse
    {
        public bool? Success { get; set; }
        public string? Message { get; set; }
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }

        public AuthResponse() { }
        public AuthResponse(bool Success, string message,string token,string refreshToken) { 
            this.Success = Success;
            this.Message = message;
            this.Token = token;
            this.RefreshToken = refreshToken;
        }
        public AuthResponse(bool Success, string message)
        {
            this.Success = Success;
            this.Message = message;
        }
    }
}
