from flask import Flask, request
from flask_restful import Resource, Api
from utils import predict_pneumo
import PneumoPredictionNet
app = Flask(__name__)
api = Api(app)

model = PneumoPredictionNet.new()

class PneumoPrediction(Resource):
    def post(self):
        chest_xray = request.files['chest_xray']
        probs = predict_pneumo(model, chest_xray)
        return probs


api.add_resource(PneumoPrediction, '/pred')

if __name__ == '__main__':
    app.run('0.0.0.0', 80)
