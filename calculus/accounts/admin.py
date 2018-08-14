from django.contrib import admin
from accounts.models import UserProfile,Function

class UserProfileAdmin(admin.ModelAdmin):
    list_display= ('user','city','phone','website','user_info','image')

    def user_info(self,obj):
        return obj.description

    def get_queryset(self,request):
        queryset = super(UserProfileAdmin,self).get_queryset(request)
        queryset = queryset.order_by('user')
        return queryset
admin.site.register(UserProfile,UserProfileAdmin)
admin.site.register(Function)
