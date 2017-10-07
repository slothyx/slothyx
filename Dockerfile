FROM tomcat:9

RUN ["rm","-rf","/usr/local/tomcat/webapps/"]
COPY backend/target/slothyx.war /usr/local/tomcat/webapps/ROOT.war