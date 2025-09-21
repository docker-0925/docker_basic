//Virtual Machine
//Teknologi mesin virtual yang terdapat pada sebuah Sistem Operasi dalam dunia insfrastructure
//Saat membuat sebuah VM, biasa akan menginstall sistem operasi juga di VM-nya
//Terkadang sistem operasi dalam VM butuh waktu cukup lama untuk booting sistem oeprasinya atau dalam merestrart VM-nya
//Terlebih lagi VM biasanya berjalan di Hypervisor (VMware, Vbox, dll) yang membutuhkan resourse yang besar

//Container
//Jika VM berfokus pada sistem operasi, Container sendiri berfokus pada sisi aplikasi
//Container sebenarnya berjalan diatas aplikasi Container Manager yang berjalan di sistem oeprasi host
//Pada VM kita harus menginstall OS lagi, namun dengan container bisa mem-package aplikasi & dependency tanpa harus install OS kembali
//Container akan menggunakan OS host dimana Container Manager (Docker) nya berjalan -> membuat hemat resourse & lebih cepat
//Ukuran container biasanya hanya hitungan MB, berbeda dengan VM yang bisa sampai GB karena harus ada OS sendiri di dalamnya
//Analoginya jika kita install VM di windows maka di VM nya kita perlu install OS lagi untuk bisa menggunakan applikasi
//Namun di container tidak perlu install OS lagi karena akan menggunakan windows di laptop/host kita sendiri
//Di dalam Container Manager dapat menginstall beberapa container, dan tidak akan mengganggu proses antar container

//Docker
//Salah satu implementasi Container Manager yang paling populer saat ini
//Diperkenalkan sekitar tahun 2013, bersifat free dan open source
docker.com

//Arsitektur Docker
//Docker menggunakan arsitektur Client-Server
//Docker client berkomunikasi dengan Docker daemon (server), keduanya otomatis terinstall ketika menginstall docker
//Docker client & Docker daemon bisa berjalan di satu sistem yang sama
//Docker client & Docker daemon berkomunikasi menggunakan REST API
//Saat menjalankan sebuah perintah dari Docker client, sebenarnya perintah tsb dieksekusi di Docker daemon (server)

//Menginstall Docker
Docker mendukung semua sistem oeprasi, meski kebanyakan berjalan di Linux
docs.docker.com/get-docker/ //Docker Desktop (Windows, Mac) -> butuh menginstall virtualisasi OS Linux untuk docker
docs.docker.com/engine/install/ //Linux -> langsung menggunakan sistem Linux nya, sesuaikan dengan distro linux user
docker version //check docker setelah install, akan mengembalikan info client & server

//Docker Registry
//Tempat menyimpan docker image
//Bisa menyimpan image yang dibuat, dan bisa digunakan di Docker Daemon dimanapun selama bisa terkoneksi ke Docker Registry
//Contoh docker registry :
//Docker Hub : https://hub.docker.com/
//Digital Ocean Container Registry : https://www.digitalocean.com/products/container-registry/
//Google Cloud Container Registry : https://cloud.google.com/container-registry
//Amazon Elastic Container Registry : https://aws.amazon.com/id/ecr/
//Azure Container Registry : https://azure.microsoft.com/en-us/services/container-registry/