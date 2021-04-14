from commandclient import CommandClient

while True:
  text = input("CMD to send:")
  client = CommandClient("0.0.0.0", "9000")

  client.send(str(text.rstrip()))
  response = client.waitForResponse()
  print(">"+str(response))

