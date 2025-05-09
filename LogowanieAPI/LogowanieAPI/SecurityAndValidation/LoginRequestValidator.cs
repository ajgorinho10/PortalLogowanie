using FluentValidation;
using LogowanieAPI.Model.DTO.AuthDTO;

namespace LogowanieAPI.SecurityAndValidation
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator() {
            RuleFor(x => x.Login).NotEmpty().WithMessage("Login jest wymagany").MaximumLength(50);
            RuleFor(x => x.Password).NotEmpty().WithMessage("Hasło jest wymagane");
        }
    }
}
