from timeslot import Timeslot


"""
    @input
        timeslot - Timeslot object
    @output
        returns whether t1 comes before t2 chronologically
"""
def validate_timeslot(timeslot):
    return timeslot.lower_bound < timeslot.upper_bound


"""
    @input
        total_range - Timeslot object, representing the upper and
                      lower bound in which a person is available
        schedule    - an array of Timeslots, representing already booked
                      timeslots for a person
   @output
        returns an array of timeslots, bounded by total_range, in which the
        person does not have any booked activities
"""
def get_free_time(total_range, schedule):
    schedule.sort(key=lambda x: x.lower_bound)
    free_timeslots = [Timeslot(total_range.lower_bound, schedule[0].lower_bound)]
    for i in range(len(schedule[:-1])):
        free_timeslots.append(Timeslot(schedule[i].upper_bound,
                                       schedule[i + 1].lower_bound))
    free_timeslots.append(Timeslot(schedule[-1].upper_bound,
                                   total_range.upper_bound))
    return [timeslot for timeslot in free_timeslots if validate_timeslot(timeslot)]


"""
    @input
        schedule1 - an array of Timeslot objects, representing already booked
                    timeslots for a person 1
        schedule2 - an array of Timeslot objects, representing already booked
                    timeslots for a person 1
    @output
        returns
"""
def get_common_schedule(schedule1, schedule2):
    common_schedule = []
    for t1 in schedule1:
        for t2 in schedule2:
            try:
                intersection = t1.get_intersection(t2)
                common_schedule.append(intersection)
            except ValueError as e:
                continue
    common_schedule = [timeslot for timeslot in common_schedule if validate_timeslot(timeslot)]
    common_schedule.sort(key=lambda x: x.lower_bound)
    return common_schedule


def get_meeting_slots(schedule1, range1, schedule2, range2, meeting_length):
    free_time_1 = get_free_time(range1, schedule1)
    free_time_2 = get_free_time(range2, schedule2)
    common_schedule = get_common_schedule(free_time_1, free_time_2)
    return [slot for slot in common_schedule if slot.get_length() >= meeting_length]
