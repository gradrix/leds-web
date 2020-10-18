from commandclient import CommandClient

while True:
  client = CommandClient("0.0.0.0", "9000")
  text = input("CMD to send:")
  client.send(str(text.rstrip()))
  response = client.waitForResponse()
  print(">"+str(response))

