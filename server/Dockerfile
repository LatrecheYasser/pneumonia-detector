FROM python:3

ENV APP_PATH /app

# install python packages
COPY requirements.txt /
RUN pip install --no-cache-dir -r requirements.txt
RUN rm requirements.txt

# setup app dir
RUN mkdir $APP_PATH
WORKDIR $APP_PATH
COPY state_dicts/saved_state.pth $APP_PATH/state_dict.pt
COPY app.py $APP_PATH

CMD python app.py
