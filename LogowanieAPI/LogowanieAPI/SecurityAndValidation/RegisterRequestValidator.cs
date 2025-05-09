using FluentValidation;
using LogowanieAPI.Model.DTO.AuthDTO;

namespace LogowanieAPI.SecurityAndValidation
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("Imię jest wymagane")
                .MaximumLength(50);

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Nazwisko jest wymagane")
                .MaximumLength(50);

            RuleFor(x => x.Login)
                .NotEmpty().WithMessage("Login jest wymagany")
                .MinimumLength(4).WithMessage("Login musi mieć co najmniej 4 znaki");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Hasło jest wymagane")
                .MinimumLength(8).WithMessage("Hasło musi mieć co najmniej 6 znaków")
                .Matches("[A-Z]").WithMessage("Hasło musi zawierać dużą literę")
                .Matches("[0-9]").WithMessage("Hasło musi zawierać cyfrę");

            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.Password).WithMessage("Hasła muszą się zgadzać");
        }
    }
}
