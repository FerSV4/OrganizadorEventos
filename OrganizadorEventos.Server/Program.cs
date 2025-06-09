
using Microsoft.EntityFrameworkCore;
using OrganizadorEventos.Server.Models;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<OrganizadorEventosContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseStaticFiles(); 
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller}/{action=Index}/{id?}");


app.MapFallbackToFile("index.html");

app.Run();