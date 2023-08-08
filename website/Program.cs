using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (HttpContext context) => context.Response.Redirect("/MyPages/figma.html"));
app.UseDefaultFiles();

app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "Pages")),
    RequestPath = "/MyPages"
});
app.Run();
