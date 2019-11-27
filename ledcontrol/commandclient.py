#!/usr/bin/env python
import asyncore
import socket
import time

class CommandClient(asyncore.dispatcher):

    def __init__(self, ip, port):
        asyncore.dispatcher.__init__(self)
        self.host = ip
        self.port = int(port)
        self.create_socket(socket.AF_INET, socket.SOCK_STREAM)
        self.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
        self.connect((self.host, self.port))

    def handle_connect(self):
        pass

    def handle_close(self):
        self.close()

    def handle_read(self):
        self.recv(40)

    def writable(self):
        return True

    def handle_error(self):
        print("CommandClient error.")

    def waitForResponse(self, timeout=10):
        begin = time.time()
        response = None
        while 1:
            if ((time.time() - begin) > timeout):
                break
            try:
                response = self.recv(40)
                if (response != None and len(response) > 0):
                    break
            except:
                pass
        self.close()
        return response
