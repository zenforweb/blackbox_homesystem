from modules import apt_manager, node_manager

import sys, os, datetime, pwd
import json, subprocess

log_file = open(os.path.join(os.path.expanduser('~'),'blackbox_install_log.txt'),'w')
manifest_file = open('manifest.json','rw')

def log(line_to_log):
    log_file.write(datetime.datetime.strftime(datetime.datetime.now(),'%y-%M-%d %H:%M:%S')+line_to_log+'\n')
    print line_to_log

def main(sys_args):
    log('Opening Manifest')
    manifest = json.load(manifest_file)
    apt_packages = manifest['dependencies']
    node_config = manifest['node_config']
    log('Starting Install')

    log('Instantializing Apt_Manager to get BASE packages')
    apt_man = apt_manager.Apt_Manager()
    node_installer = node_installer.Node_Installer(node_config,log)
    for p2_install in apt_packages:
        log('Marking [%s] For Install' % (p2_install))
        apt_man.mark_package_for_install(p2_install)
    log('Installing All Marked Packages')
    apt_man.install_marked_packages()

    log('Starting NODEJS source compilation')
    if node_config['use_git'] == 1:
        log('Installing NODEJS via GIT')
        node_installer.install_via_git()

    log('Finished Base Install')
    log('Closing Manifest')
    manifest_file.close()

if __name__ == "__main__":
    if 'SUDO_USER' in os.environ:
        main(sys.argv)
    else:
        log("need to run as sudo")
        sys.exit(0)
else:
    log("not ready for inheritence, just to run")
    sys.exit(0)
