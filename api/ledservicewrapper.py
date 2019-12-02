import sys
import re
from api.models.ledsettings import LedSettings
from api.models.modelayout import ModeLayout
from api.commandclient import CommandClient

LED_HOST = "localhost"
LED_PORT = "800"

class LedServiceWrapper():

    def __init__(self, ip = LED_HOST, port = LED_PORT):
        self.cmdClient = CommandClient(ip, port)

    def getSettings(self, settingsString = None):
        res = LedSettings()
        if (settingsString == None):
            self.cmdClient.send("ST")
            settingsData = self.cmdClient.waitForResponse()
        else:
            settingsData = settingsString
        
        resultArray = re.findall("(?:[a-zA-Z]*:)(?:(?!;).)*", settingsData, re.DOTALL)

        for param in resultArray:
            paramValues = param.split(":")
            key = paramValues[0]
            value = paramValues[1]

            if (key == "B"):
                res.brightness = int(value)
            elif (key == "O"):
                res.isOn = True if value == "True" else False
            elif (key == "M"):
                res.mode = int(value)
            elif (key == "T"):
                res.toggle = int(value)
            elif (key == "S"):
                res.speed = int(value)
        return res
    
    def getModeLayout(self):
        res = ModeLayout()
        self.cmdClient.send("LA")
        layoutData = self.cmdClient.waitForResponse()
        
        resultArray = re.findall("(?:[a-zA-Z]*:)(?:(?!;).)*", layoutData, re.DOTALL)

        for param in resultArray:
            paramValues = param.split(":")
            key = paramValues[0]
            value = paramValues[1]

            if (key == "N"):
                res.name = str(value)
            elif (key == "I"):
                res.id = str(value)
            elif (key == "Smin"):
                res.minSpeed = int(value)
            elif (key == "Smax"):
                res.maxSpeed = int(value)
        return res

    def setSetting(self, setting):
        self.cmdClient.send(setting)
        allSettings = self.cmdClient.waitForResponse()
        return self.getSettings(allSettings)
