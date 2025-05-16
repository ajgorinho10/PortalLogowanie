using FluentValidation;
using LogowanieAPI.Model.DTO.AuthDTO;
using Microsoft.EntityFrameworkCore;

namespace LogowanieAPI.SecurityAndValidation
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator(ApplicationDbContext context)
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("Imię jest wymagane")
                .MaximumLength(50).WithMessage("Imię ma maksymalnie 50 znaków");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Nazwisko jest wymagane")
                .MaximumLength(50).WithMessage("Nazwisko ma maksymalnie 50 znaków");

            RuleFor(x => x.Login)
                .NotEmpty().WithMessage("Login jest wymagany")
                .MinimumLength(4).WithMessage("Login musi mieć co najmniej 4 znaki").
                MustAsync(async (login, cancellation) =>
                {
                    var exists = await context.Users.FirstOrDefaultAsync(u => u.Login == login);
                    if (exists != null)
                    {
                        return false;
                    }
                    
                    return true;
                })
            .WithMessage("Login jest już zajęty");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Hasło jest wymagane")
                .MinimumLength(12).WithMessage("Hasło musi mieć co najmniej 6 znaków")
                .Matches("[A-Z]").WithMessage("Hasło musi zawierać dużą literę")
                .Matches("[0-9]").WithMessage("Hasło musi zawierać cyfrę");

            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.Password).WithMessage("Hasła muszą się zgadzać");
        }
    }
}
