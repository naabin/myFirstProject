

from django.shortcuts import render,redirect
from django.views.generic import TemplateView
from accounts.forms import RegistrationForm,EditProfileFrom,IntegrationForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserChangeForm,PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from . import models
from accounts.forms import IntegrationForm
from accounts.models import Function
from django.shortcuts import get_object_or_404
from sympy.printing.latex import LatexPrinter, print_latex
import sympy as sp
from sympy import *
import jinja2
import IPython.core
import matplotlib.pyplot as plt,mpld3
from mpld3 import plugins
import json
sp.init_printing(use_latex=True)
def integration(request):
    return render(request,'accounts/integrationcalculator.html')
def home(request):
    return render(request,'accounts/home.html')
def integrals(request):
    return render(request,'accounts/tableOfIntegrals.html')
def derivatives(request):
    return render(request,'accounts/tableOfDerivatives.html')
def trigIden(request):
    return render(request,'accounts/trigIden.html')
def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('accounts/home/')
    else:
        form = RegistrationForm()

    args = {'form':form}
    return render(request, 'accounts/reg_form.html',args)
def view_profile(request):
    args = {'user':request.user}
    return render(request,'accounts/profile.html',args)
def edit_profile(request):
    if request.method == 'POST':
        form = EditProfileFrom(request.POST,instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('/accounts/profile/')
    else:
        form = EditProfileFrom(instance=request.user)
        args = {'form':form}
    return render(request,'accounts/edit_profile.html',args)
def change_password(request):
    if request.method =='POST':
        form = PasswordChangeForm(data=request.POST,user=request.user)

        if form.is_valid():
            form.save()
            update_session_auth_hash(request,form.user,)
            return redirect('accounts/profile/')
        else:
            return redirect('accounts/change_password/')
    else:
        form = PasswordChangeForm(user=request.user)
    args = {'form':form}
    return render(request,'accounts/change_password.html/',args)
class FunctionView(TemplateView):
    template_name = 'accounts/integrationcalculator.html/'
    def get(self, request):
        form = IntegrationForm()
        return render(request,self.template_name,{'form':form})
    def post(self,request):
        form = IntegrationForm(request.POST)
        if form.is_valid():
            text = form.cleaned_data['question']
            q =    latex(sp.Integral(text))
            ans =  latex(sp.integrate(text))
            fig = plt.figure()
            plt.plot(['ans'])
            figure_graph = dict()
            figure_graph['id'] = 'figure_01'
            figure_graph['json'] = json.dumps(mpld3.fig_to_dict(fig))
            plt.close()
            return render(request,'accounts/integrationcalculator.html/',{'form':form,'ans':ans,'q':q,'figure_graph':figure_graph})
        args = {'form':form}
        return render(request,self.template_name,args)
