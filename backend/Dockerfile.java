FROM ubuntu:latest

RUN apt update && apt install -y openjdk-8-jdk

WORKDIR /home/src

