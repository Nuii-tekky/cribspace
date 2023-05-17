from django.shortcuts import render

# Create your views here.
def rendercreatepostpage(req):
  return render (req,"create_post.html")

def renderpostdetail(req,id):
  postid={
    "post_id":id
  }

  return render(req,"post_detail.html",postid)  
