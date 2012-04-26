from  modules import apt_manager
import os
import json
import datetime
import sys
log_file = open(os.path.join(os.path.expanduser('~'),'blackbox_install_log.txt'),'w')
manifest_file = open('manifest.json','rw')

def log(line_to_log):
    log_file.write(datetime.datetime.strftime(datetime.datetime.now(),'%y-%M-%d %H:%M:%S')+line_to_log+'\n')
    print line_to_log

def main(args):
    log('Opening Manifest')
    manifest = json.load(manifest_file)
    apt_packages = manifest['dependencies']
    log('Starting Install')
    log('Instantializing Apt_Manager')
    apt_man = apt_manager.Apt_Manager()
    for p2_install in apt_packages:
        log('Marking [%s] For Install' % (p2_install))
        apt_man.mark_package_for_install(p2_install)
    log('Installing All Marked Packages')
    #apt_man.install_marked_packages()
    log('Finished Base Install')
    log('Closing Manifest')
    manifest_file.close()

if __name__ == "__main__":
    main(sys.argv)
else:
    print "not ready for inheritence, just to run"
