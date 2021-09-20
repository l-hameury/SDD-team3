# Pull down an image from Docker Hub that includes the .NET core SDK: 
# https://hub.docker.com/_/microsoft-dotnet-core-sdk
# This is so we have all the tools necessary to compile the app.
FROM mcr.microsoft.com/dotnet/sdk:5.0-focal AS dotnet-build

# Install Node JS version 14
RUN curl --silent --location https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install --yes nodejs

WORKDIR /src
# Copy the source from your machine onto the container.
# COPY . /src

# RUN dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p "sus"
# RUN dotnet dev-certs https --trust

# Install dependencies. 
# https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-restore?tabs=netcore2x
# RUN dotnet restore "./rtchatty.csproj"

ENTRYPOINT ["dotnet", "run", "rtchatty.csproj"]