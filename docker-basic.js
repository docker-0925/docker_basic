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

//Docker Image
//Mirip seperti installer aplikasi, di dalam docker image terdapat aplikasi dan dependency
//Sebelum bisa menjalankan aplikasi di Docker, perlu memastikan memiliki docker image aplikasi tersebut
docker image ls //melihat docker image di Docker Daemon
docker image pull <nama-image:tag> //download docker image dari docker registry, bisa mencari docker image di hub.docker.com
docker image rm <nama-image:tag> //hapus docker image yang sudah di download

//Docker Container
//Jika docker image mirip sebuah installer aplikasi, maka docker container mirip seperti aplikasi hasil installernya
//Satu docker image bisa digunakan membuat beberapa docker container, asal nama container nya berbeda
//Jika sudah membuat docker container dan menginstall docker image, image tsb tidak dapat dihapus karena container menggunakan isinya bukan mencopy
//Secara default container tidak akan berjalan setelah dibuat, perlu menjalankannya jika ingin menjalankan container
docker container ls -a //melihat semua container yang berjalan atau tidak
docker container ls //melihat container yang berjalan
docker container create --name <nama-container> <nama-image:tag> //membuat container, name container harus unix, jika sukses akan show container id
//note : jika kita membuat container dengan image yang belum didownload, maka docker akan otomatis mendownload dulu
docker container start <container-id> / <container-name> //menjalankan container
docker container stop <container-id> / <container-name> //menghentikan container, sebelum menghapus
docker container rm <container-id> / <container-name> //menghapus container

//Container Log
//Untuk melihat log guna tau detail log aplikasi yang terdapat pada container agar memudahkan debugging
docker container logs <container-id> / <container-name> //cek log container
docker container logs -f <container-id> / <container-name> //cek log container secara realtime

//Container Exec
//Saat membuat container, aplikasi di dalam container hanya bisa diakses dari dalam container
//Kadang kita perlu masuk ke dalam container itu sendiri, disini bisa menggunakan Container Exec
//Container exec digunakan untuk mengekseskusi kode program yang terdapat di dalam container (tidak masuk secara langsung)
docker container exec -i -t <container-id> / <container-name> /bin/bash
// -i : argument interaktif, menjaga input tetap aktif
// -t : argument untuk alokasi pseudo-TTY (terminal akses)
// /bin/bash : contoh kode program yang terdapat di dalam container

//Container Port
//Aplikasi yang diinstall pada container mempunyai port, yang hanya bisa diakses dari dalam container itu sendiri
//Di docker ada Port Forwarding untuk meneruskan port di sistem ke dalam container, atau mengekspos port di container ke luar
docker container create --name <nama-container> --publish <port-host:port-container> <nama-image:tag> //port forwarding
//note : jika ingin > 1 port forwarding bisa tambahkan parameter --publish nya atau disingkat -p
//Jika sudah dibuat container dengan port forwarding dan dijalankan, maka pada container list akan tertera port forwarding nya
//Dengan ini jadi bisa mengakses port aplikasi pada container menggunakan laptop host kita, misal akses nginx container pada localhost:8080

//Container Environment Variable
//Salah satu teknik agar konfigurasi aplikasi bisa diubah dinamis saat membuat app adalah menggunakan Environment Variable
//Dengan Environment Variable, kita bisa mengubah-ubah konfigurasi app tanpa harus mengubah kode aplikasi
//Docker Container memiliki parameter yang bisa digunakan untuk mengirim environment variable ke app yang terdapat dalam container
docker container create --name <nama-container> --env KEY="value" --env KEY2="value" <nama-image:tag>
//note: env bisa satu atau lebih tinggal disesuaikan, contoh mongo dengan port forwarding :
docker container create --name mongo1 --publish 27017:27017 --env MONGO_INITDB_ROOT_USERNAME=hasan --env MONGO_INITDB_ROOT_PASSWORD=password mongo:latest
//Dengan ini mongo pada container docker dapat diakses dari host menggunakan env username & password yang sudah diset