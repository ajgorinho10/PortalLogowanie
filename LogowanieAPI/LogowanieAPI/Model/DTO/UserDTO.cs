using System.Diagnostics.CodeAnalysis;

namespace LogowanieAPI.Model.DTO
{
    public class UserDTO
    {
        public required long Id { get; set; }
        public required string Login { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [SetsRequiredMembers]
        public UserDTO (long Id,string Login,string FirstName, string LastName)
        {
            this.Id = Id;
            this.Login = Login;
            this.FirstName = FirstName;
            this.LastName = LastName;
        }

        [SetsRequiredMembers]
        public UserDTO(User user)
        {
            this.Id = user.Id;
            this.Login = user.Login;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
        }

        public static  List<UserDTO> ToListDTO(List<User> users)
        {
            List<UserDTO> toDTO = new();
            foreach (var user in users)
            {
                toDTO.Add(new UserDTO(user));
            }

            return toDTO;
        }

    }
}
