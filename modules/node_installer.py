import subprocess, os
class Node_Installer(object):
    def __init__(self,uid,gid,sid,sgid,config,log):
        self.user_id = uid
        self.group_id = gid
        self.sudo_id = sid
        self.sudo_gid = sgid
        self.config = config
        self.log = log

    def install_via_git(self):
        self.log("Cloning NODEJS GIT Repo")
        subprocess.Popen("git clone %s %s" % (self.config['git_clone_url'],self.config['download_location']), shell=False, stdout=subprocess.STDOUT, stderr=subprocess.STDOUT)
        self.log("CHANGING DIR to %s"%(self.confing['download_location']))
        os.chdir(self.config['download_location'])
        self.log("Running Configure")
        subprocess.Popen('./configure', shell=True, stdout=subprocess.STDOUT, stderr=subprocess.STDOUT)
        self.log("Changing out of SUDO")
        os.setuid(self.user_id)
        os.setguid(self.group_id)
        
        
