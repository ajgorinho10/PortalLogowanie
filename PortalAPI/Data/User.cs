using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PortalAPI.Data
{
    public class User
    {
        [Key] // Klucz główny
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; }
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
