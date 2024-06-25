using System.Collections.Generic;
using System.Numerics;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;

namespace UserManagement.Models.Context
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions opts) : base(opts)
        {

        }
        public DbSet<User>? Users { get; set; }
        public DbSet<Agent>? Agents { get; set; }
        public DbSet<Customer>? Customers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => new { u.Email })
                .IsUnique(true);
        }
    }
}
