def readStandardFile(fn,filename):
    book = xlrd.open_workbook(file_contents=fn)
    table=book.sheets()[0]
    nrows = table.nrows
    ncols = table.ncols
    begin=False
    dan=[]
    for i in range(nrows ):
        cells=table.row_values(i)
        if cells[0]=="其他入库单":
            if not begin:
                begin=True
                onedan=[]
            else:
                #finish
                dan.append(onedan)
                onedan=[]
        else:
            if begin:
                onedan.append(cells)
            else:
                pass
    logging.info(onedan)
    if len(onedan)>0:
        dan.append(onedan)
    rs=[]
    for one in dan:
        r=treatOne(one,filename)
        if r!=None: 
            rs.append(r)
    return rs
def treatOne(rows,fn):
    r=None
    beizhu=rows[1][7]
    if beizhu[:2]=="CS" or beizhu[:2]=="ON":
        name=rows[1][7]+"_"+fn
        d=Pack.objects.filter(name=name)
        logging.info(d)
        if len(d)>0:
            pass
        else:
            d=Pack()
            d.name=rows[1][7]+"_"+fn
            d.save()
            n=len(rows)
            items=rows[4:4+n-4-3]
            for i in items:
                #i=DanjuItem()
                print(i[1],i[2],i[3],i[4],i[5])
                items=Item.objects.filter(bh=i[1]).all()
                if len(items)>1:
                    item=items[0]
                else:
                    item=Item()
                item.bh=i[1]
                item.name=str(i[2])+" "+str(i[1])
                item.guige=i[3]
                item.danwei=i[4]
                item.save()
                di=PackItem()
                di.pack=d
                di.item=item
                di.ct=i[5]
                di.save()
            r={"id":d.id,"name":d.name}
    return r
def standard(request):
    # right, so 'file' is the name of the file upload field
    #print request.FILES
    logging.info(request.FILES)
    f= request.FILES[ 'file' ]
    logging.info(dir(f))
    filename = f.name
    filetype = f.content_type
    packs=readStandardFile(f.read(),filename)
    res={"success":True, "result":packs}
    return HttpResponse(json.dumps(res, ensure_ascii=False))   