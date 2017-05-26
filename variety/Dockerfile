FROM mkenney/npm
 
RUN mkdir /runtime
WORKDIR /runtime

COPY ./ /runtime/

RUN chmod -R 777 /runtime/

RUN npm install && npm run build

CMD ['npm' 'run' 'start']