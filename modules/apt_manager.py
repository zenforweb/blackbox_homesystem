import apt
class Apt_Manager(object):
    def __init__(self):
        self.cache = apt.Cache()

    def install_package(self,pkg):
        if type(pkg) == str:
            pkg = self.get_package(pkg)
        if type(pkg) == apt.package.Package:
            pkg.mark_install()
            self.cache.commit()
            return 1
        else:
            return 0

    def mark_package_for_install(self,pkg):
        if type(pkg) == str:
            pkg = self.get_package(pkg)
        if type(pkg) == apt.package.Package:
            pkg.mark_install()
            return 1
        else:
            return 0

    def install_marked_packages(self):
        self.cache.commit()

    def get_package(self,pkg_name):
        try:
            pkg = self.cache[pkg_name]
        except KeyError, e:
            pkg = 0
        return pkg
