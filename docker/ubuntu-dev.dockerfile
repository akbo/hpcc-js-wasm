FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get upgrade -y

# Install pre-requisites (keep synced with README.md)
## NodeJS
RUN apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs

## Other
RUN apt-get install -y build-essential
RUN apt-get install -y git cmake wget zip
RUN apt-get install -y gcc-multilib g++-multilib pkg-config autoconf bison libtool flex
RUN apt-get install -y python3 python3-pip

# Set the working directory
WORKDIR /usr/src/app

COPY ./scripts ./scripts

RUN ./scripts/cpp-install-emsdk.sh
RUN ./scripts/cpp-install-graphviz.sh
RUN ./scripts/cpp-install-vcpkg.sh
RUN ./vcpkg/bootstrap-vcpkg.sh

COPY . .

RUN npm ci
RUN npm run build
RUN npm run test-node
