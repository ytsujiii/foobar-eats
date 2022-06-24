FROM ubuntu:latest

RUN apt-get update && \
  apt-get install -y openjdk-8-jdk wget unzip make

WORKDIR /home

RUN wget https://services.gradle.org/distributions/gradle-7.0.2-bin.zip && \
  unzip gradle-7.0.2-bin.zip && \
  rm gradle-7.0.2-bin.zip && \
  ln -s /home/gradle-7.0.2/bin/gradle /usr/local/bin/gradle

WORKDIR /home/src
