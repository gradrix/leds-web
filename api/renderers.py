from rest_framework.renderers import JSONRenderer

class JRenderer(JSONRenderer):
    def has_permission(self, firstArg, secondArg):
        return True

    def has_object_permission(self, a, b, c):
        return True
