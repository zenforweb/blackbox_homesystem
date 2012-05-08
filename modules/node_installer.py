import os
import pwd
import subprocess
import sys

class Node_Installer(object):
    def __init__(self,config,log):
        pw_record = pwd.getpwnam(os.environ['SUDO_USER'])
        su_record = pwd.getpwnam('sudo')
        self.user_name = pw_record.pw_name
        self.user_id = pw_record.pw_uid
        self.user_home = pw_record.pw_dir
        self.user_gid = pw_record.pw_gid
        self.sudo_id = su_record.pw_uid
        self.sudo_home = su_record.pw_dir
        self.sudo_gid = su_record.pw_gid
        self.sudo_name = su_record.pw_name
        self.config = config
        self.log = log
    def demote_user(self,user_uid,user_gid):
        def result():
            os.setgid(user_gid)
            os.setuid(user_uid)
        return result

    def install_via_git(self):
        self.log("Cloning NODEJS GIT Repo")
        subprocess.Popen("git clone %s %s" % (self.config['git_clone_url'],self.config['download_location']), shell=False, stdout=subprocess.STDOUT, stderr=subprocess.STDOUT)
        self.log("CHANGING DIR to %s"%(self.confing['download_location']))
        os.chdir(self.config['download_location'])
        self.log("Running Configure")

        env = os.environ.copy()
        env['HOME'] = self.user_home
        env['LOGNAME'] = self.user_name
        env['PWD'] = '/bin/sh'
        env['USER'] = self.user_name
        self.log("Changing out of SUDO")
        config_process = subprocess.Popen(
            './configure', preexec_fn = demote_user(self.user_id, self.user_gid), cwd = '/bind/sh' env=env
        )
        config_result = config_process.wait()
        make_process = subprocess.Popen(
            './make', preexec_fn=demote_user(self.user_id, self.user_gid), cwd='/bin/sh', env=env
        )
        result = make_process.wait()
    
        self.log("Installing...")
        subprocess.Popen('./make install', shell=True, stdout=subprocess.STDOUT, stderr=subprocess.STDOUT)
        self.log('Verifying Install')
        a = subprocess.check_output(['node','-v'])
