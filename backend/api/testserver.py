from commandclient import CommandClient

while True:
  text = input("CMD to send:")
  client = CommandClient("localhost", "9000")

  response = client.send(str(text.rstrip()))
  print(">"+str(response))

