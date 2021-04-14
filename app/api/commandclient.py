import asyncore
import socket
import time

class CommandClient(asyncore.dispatcher):

    def __init__(self, ip, port):
        asyncore.dispatcher.__init__(self)
        self.host = ip
        self.port = int(port)
        self.create_socket(socket.AF_INET, socket.SOCK_STREAM)
        self.connect((self.host, self.port))

    def handle_close(self):
        self.close()

    def send(self, data):
        super().send(data.encode('ascii'))

    def writable(self):
        return True

    def waitForResponse(self, timeout=10):
        begin = time.time()
        response = None
        while 1:
            if ((time.time() - begin) > timeout):
                break
            try:
                response = self.recv(100)
                if (response != None and len(response) > 0):
                    break
            except:
                pass
        self.close()
        return response.decode('ascii')
