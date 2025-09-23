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

//Container Stats
//Ketika menjalankan container di host akan terlihat penggunaan resource seperti CPU, memory dll digunakan oleh docker saja
//Di docker kita bisa melihat detail stats penggunaan resourse lebih detail tiap container yang sedang berjalan
docker container stats //akan terlihat detail stats penggunaan resource tiap image/app yang jalan di container

//Container Resource Limit
//Saat membuat container, secara default akan menggunakan semua CPU & Memory yang diberikan ke docker diawal (Mac & Windows)
//Dan akan menggunakan semua CPU & Memory yang tersedia di sistem host (Linux)
//Namun jika terjadi kondisi container terlalu banyak memakan CPU & Memory, bisa mengganggu performa container lain atau bahkan ke host
//Jadi perlu ketika membuat container diawal, langsung berikan resource limit terhadap containernya
//Menentukan limit memory dengan menambah --memory diikut angka size memory nya (b, k, m, g). --memory 4g
//Menentukan limit cpu dengan menambah --cpus diikut angka core cpu nya (0.5, 1, 1.5 dst). --cpus 1.5
docker container create --name <nama-container> --publish <port-host:port-container> --memory 1g --cpus 1.5 <nama-image:tag>
//Maka jika sudah dijalankan dan di cek stats nya pada bagian memory akan tertera limit memorynya

//Bind Mounts
//Kemampuan melakukan mounting (sharing) file/folder di host ke container yang terdapat di docker
//Sangat berguna ketika ingin mengirim konfigurasi dari luar container/menyimpan data yang dibuat di aplikasi pada container ke dalam folder di host
//Jika file/folder tidak ada di sistem host, maka secara otomatis akan dibuatkan oleh docker
//Untuk melakukan mounting bisa menggunakan parameter --mount ketika membuat container dengan aturan :
//type : bind/volume, source : lokasi di host, destination : lokasi di container, readonly : jika ada, akses hanya baca di container
docker container create --name <nama-container> --mount "type=bind,source=folder,destination=folder,readonly" <nama-image:tag>
docker container create --name mongo3 --publish 27019:27017 --mount "type=bind,source=D:\QA\PZN\Docker\docker_basic\mongo,destination=/data/db" --env MONGO_INITDB_ROOT_USERNAME=hasan3 --env MONGO_INITDB_ROOT_PASSWORD=password mongo:latest
//Jika kita jalankan container diatas, maka pada folder source akan tersimpan file2 yang dibutuhkan mongo, dengan begini jika kita menghapus container tsb -> data di source tidak akan ikut terhapus dan bisa kita gunakan untuk source lagi
//note: berikan source yang punya akses RW, jangan simpan di C jika di windows

//Docker Volume
//Pada docker versi terbaru lebih direkomendasikan menggunakan Docker Volume daripada Bind Mounts
//Docker Volume bisa management volume untuk membuat, melihat daftar, dan menghapus volume
//Volume adalah storage yang digunakan untuk menyimpan data yang disimpan & dimanage oleh docker, sedangkan Bind Mounts disimpan di host
//Saat pertama kali membuat container, secara default data container juga disimpan di dalam volume
docker volume ls //melihat daftar volume
docker volume create <nama-volume> //membuat volume
docker volume rm <nama-volume> //menghapus volume, pastikan volume sudah tidak digunakan container (stop container) agar dapat dihapus

//Container Volume
//Volume yang sudah dibuat, bisa digunakan oleh container, agar ketika container dihapus -> data tetap aman di volume (seperti bind mounts)
//Caranya sama seperti bind mount, menggunakan parameter --mount dengan type : volume dan soruce : nama volume
docker container create --name mongo3 --publish 27020:27017 --mount "type=volume,source=mongovolume,destination=/data/db" --env MONGO_INITDB_ROOT_USERNAME=hasan --env MONGO_INITDB_ROOT_PASSWORD=password mongo:latest

//Backup Volume
//Belum ada cara otomatis untuk melakukan backup volume yang sudah dibuat
//Namun bisa memanfaatkan container untuk melakukan backup data yang ada di volume ke dalam archive zip/tar.gz
//1. Stop container yang menggunakan volume yang ingin dibackup
//2. Buat container baru dengan dua mount: volume yang ingin dibackup & bind mount folder dari host, jalankan
docker container create --name nginxbackup --mount "type=bind,source=\QA\PZN\Docker\docker_basic\backup,destination=/backup" --mount "type=volume,source=mongoolume,destination=/data" nginx:latest
//3. Lakukan backup menggunakan container dengan cara mengarchive isi volume & simpan di bind mount folder
//4. Isi file backup sekarang ada di folder sistem host yang bind mount tadi
//5. Stop & delete container yang digunakan untuk melakukan backup
//note: terdapat cara lebih cepat untuk backup volume dengan perintah : (untuk app yang bisa auto stop setelah selesai, misal : ubuntu)
docker container run --rm --name ubuntubackup --mount "type=bind,source=\QA\PZN\Docker\docker_basic\backup,destination=/backup" --mount "type=volume,source=mongoolume,destination=/data" ubuntu:latest tar cvf /backup/backup.tar.gz /data

//Restore Volume
//Setelah melakukan backup volume ke dalam file archive, dapat mencoba untuk restore data backup ke volume baru
//1. Membuat volume baru untuk lokasi restore  data backup
//2. Membuat container baru dengan dua mount : volume baru untuk restore backup & bind mount folder dari host yang berisi file backup
docker container run --rm --name ubunturestore --mount "type=bind,source=\QA\PZN\Docker\docker_basic\backup,destination=/backup" --mount "type=volume,source=mongorestore,destination=/data" ubuntu:latest bash -c "cd /data && tar xvf /backup/backup.tar.gz --strip 1"
//3. Melakukan restore menggunakan container dengan cara ekstract isi backup file ke dalam volume
//4. Isi file backup sekarang sudah di restore ke volume
//5. Delete container yang kita gunakan untuk melakukan restore tadi
//6. Volume baru yang berisi data backup siap digunakan oleh container baru