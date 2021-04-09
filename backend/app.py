from flask import Flask, request, abort
from flask_cors import CORS, cross_origin
from timeslot import Timeslot
from utility import get_meeting_slots

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


"""
    @input
        input_array - string that represents an array of timeslots
    @output
        returns an array of Timeslot objects that represent the same intervals
"""
def parse_input_array(input_array):
    return [Timeslot(x, y) for x, y in [val.split(".") for val in input_array.split(",")]]


"""
    @input
        input_range - string that represents a single timeslot
    @output
        returns a Timeslot object that represents the same interval
"""
def parse_input_range(input_range):
    return Timeslot(input_range.split(".")[0], input_range.split(".")[1])


@app.route('/', methods=['GET'])
@cross_origin()
def hello_world():
    if request.method == "GET":
        range1 = parse_input_range(request.args.get('range1'))
        schedule1 = parse_input_array(request.args.get('schedule1'))
        range2 = parse_input_range(request.args.get('range2'))
        schedule2 = parse_input_array(request.args.get('schedule2'))
        meeting_length = int(request.args.get('meeting_length'))
        meeting_slots = get_meeting_slots(schedule1, range1, schedule2, range2, meeting_length)
        return {"msg": " ".join([str(slot) for slot in meeting_slots])}
    return abort(405)


if __name__ == '__main__':
    app.run()
