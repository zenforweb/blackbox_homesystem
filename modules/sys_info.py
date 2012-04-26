import string
import subprocess
import os
import sys
import json

class System_Info(object):
    def __init__():
        self.location = os.path.join(str(os.environ['HOME']),'/blackbox_homesystem/package.json')
        #print 'using package.json from:', location
        self.package = open(location, 'r+')
        #json_parse(package)

    def decode_list(data):
        raw = []
        for item in data:
            if isinstance(item, unicode):
                item = item.encode('utf-8')
            elif isinstance(item, list):
                item = decode_list(item)
            elif isinstance(item, dict):
                item = decode_dict(item)
            raw.append(item)
        return raw

    def decode_dict(data):
        raw = {}
        for key, value in data.iteritems():
            if isinstance(key, unicode):
                key = key.encode('utf-8')
            if isinstance(value, unicode):
                value = value.encode('utf-8')
            elif isinstance(value, list):
                value = decode_list(value)
            elif isinstance(value, dict):
                value = decode_dict(value)
            raw[key] = value
        return raw

    def json_parse(package):
        level = 0
        reqs = {}
        ver = []
        raw = json.load(package, object_hook = decode_dict)
        if raw['dependencies'] is not None:
            for k,v in raw['dependencies'].iteritems():
                reqs[k] = v.translate(None, string.punctuation)
            #print reqs
            return reqs

    def sysinfo(reqs):
        all_deps = []
        print "Running on",sys.platform,'\n'
        if sys.version_info < (2, 4):
            print 'use a newer version of Python'
        else:
            print 'Python ok \n'

        for req,ver in reqs.iteritems():
            try:
                current_dep = {}
                print 'checking for:',req
                app = subprocess.check_output(['which',req])
                print 'Located:',app, 'checking version'
                if 'node' in req:
                    node_raw = subprocess.check_output(['node', '--version'])
                    node = node_raw.strip().translate(None, string.letters).translate(None, string.punctuation)
                    try:
                        node = int(node)
                        ver = int(ver)
                        current_dep['dependency'] = 'node'
                        current_dep['dependency_version'] = node_raw.strip().translate(None, string.letters)
                        current_dep['dependency_location'] = app.strip()
                            #print current_dep
                        print 'node ok \n'
                        if node >= ver:
                            current_dep['valid_packge'] = True
                        else:
                            current_dep['valid_packge'] = False
                            print 'node too old \n'
                    except ValueError, e:
                        print e
                elif 'mysqld' in req:
                    mysql_raw = subprocess.check_output(['mysql', '-V'])
                    mysql_strip = mysql_raw.strip().translate(None, string.letters).translate(None, string.punctuation)
                    mysql = mysql_raw.split(',')
                    mysql_ver = mysql[0].split(' ')
                    mysql = mysql_ver[5].replace('.','')
                    try:
                        mysql = int(mysql)
                            #mysql_strip = int(mysql_strip)
                    except ValueError, e:
                        print e
                    current_dep['dependency'] = 'mysql'
                    current_dep['dependency_version'] = mysql_ver[5]
                    current_dep['dependency_location'] = app.strip()
                    print 'mysql ok \n'
                        #print current_dep
                    if mysql_strip >= mysql:                    
                        current_dep['valid_package'] = True
                    else:
                        current_dep['valid_package'] = False
                        print 'mysql too old \n'
                            #print all_deps
                    elif 'npm' in req:
                        npm_raw = subprocess.check_output(['npm', '--version'])
                        npm = npm_raw.replace('.','')
                        try:
                            npm = int(npm)
                            if ver == '':
                                ver = 0
                                current_dep['dependency'] = 'npm'
                                current_dep['dependency_version'] = npm_raw.strip()
                                current_dep['dependency_location'] = app.strip()
                    print 'npm ok \n'
                    #print current_dep
#                        print all_deps
                    if npm >= ver:
                        current_dep['valid_package'] = True
                    else:
                        current_dep['valid_package'] = False
                        print 'npm too old \n'
                except ValueError, e:
                    print e
                #print all_deps
            elif req in ('jade','stylus','express'):
                npm_pak_raw = subprocess.check_output(['npm', 'view', req,"""@">=""",ver,'''"''','version'])
                npm = npm_pak_raw.replace('.','')
                print npm_pak_raw
            else:
                print """Can't figure out""", req, '\n'
                #sys.exit(-1)
            all_deps.append(current_dep)                   
                
    
        except subprocess.CalledProcessError:
            print 'Missing:', req
    #print all_deps    
    return all_deps

print sysinfo(json_parse(package))
