FROM ubuntu:latest

RUN apt-get update && \
  apt-get install -y openjdk-8-jdk && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

COPY ./backend /home/src

WORKDIR /home/src

CMD ["java", "-jar", "./build/libs/sample-1.0-SNAPSHOT.jar"]
