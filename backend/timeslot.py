"""
    Representation for a timeslot, meaning
    a pair of timestamps, represented in the format hh:mm
"""


class Timeslot():
    def __init__(self, lower_bound, upper_bound):
        self.__upper_bound = upper_bound
        self.__lower_bound = lower_bound

    @property
    def upper_bound(self):
        return self.__upper_bound

    @property
    def lower_bound(self):
        return self.__lower_bound

    @upper_bound.setter
    def upper_bound(self, new_upper_bound):
        self.__upper_bound = new_upper_bound

    @lower_bound.setter
    def lower_bound(self, new_lower_bound):
        self.__lower_bound = new_lower_bound

    def __eq__(self, other):
        return self.__upper_bound == other.upper_bound and\
               self.__lower_bound == other.lower_bound

    def __str__(self):
        return "(" + self.__lower_bound + ", " + self.__upper_bound + ")"

    """
        @input
            timeslot - Timeslot object, each representing a timestamp,
                       with the format hh::mm
        @output
            returns the time between t1 and t2 in minutes
    """
    def get_length(self):
        h1, m1 = self.__upper_bound.split(":")
        h2, m2 = self.__lower_bound.split(":")
        return abs((int(h2) - int(h1)) * 60 + int(m2) - int(m1))


    """
        @input 
            other - timeslot for which intersection is checked
        @output
            returns a common interval between the current object and other
    """
    def get_intersection(self, other):
        if other.lower_bound > self.__upper_bound or\
           self.__lower_bound > other.upper_bound:
            raise ValueError("Timeslots do not intersect")
        lower_bound = self.__lower_bound if self.__lower_bound > other.lower_bound else other.lower_bound
        upper_bound = self.__upper_bound if other.upper_bound > self.__upper_bound else other.upper_bound
        return Timeslot(lower_bound, upper_bound)
