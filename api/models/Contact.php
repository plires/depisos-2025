<?php

/**
 * Modelo Contact
 * Maneja las operaciones de base de datos para la tabla contacts
 */

require_once __DIR__ . '/../config/database.php';

class Contact
{
    private $conn;
    private $table_name = "contacts";

    // Propiedades del objeto
    public $id;
    public $name;
    public $email;
    public $phone;
    public $comments;
    public $surface;
    public $province;
    public $profile;
    public $ip;
    public $originUrl;
    public $source;
    public $date;

    /**
     * Constructor
     */
    public function __construct($db = null)
    {
        if ($db) {
            $this->conn = $db;
        } else {
            $database = new Database();
            $this->conn = $database->getConnection();
        }
    }

    /**
     * Crea un nuevo contacto en la base de datos
     * @return bool True si se guardó correctamente, False en caso contrario
     */
    public function create()
    {
        // Query de inserción
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    name = :name,
                    email = :email,
                    phone = :phone,
                    comments = :comments,
                    surface = :surface,
                    province = :province,
                    profile = :profile,
                    ip = :ip,
                    originUrl = :originUrl,
                    source = :source,
                    date = :date";

        try {
            // Preparar statement
            $stmt = $this->conn->prepare($query);

            // Sanitizar datos
            $this->name = htmlspecialchars(strip_tags($this->name));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->phone = htmlspecialchars(strip_tags($this->phone));
            $this->comments = htmlspecialchars(strip_tags($this->comments));
            $this->surface = htmlspecialchars(strip_tags($this->surface));
            $this->province = htmlspecialchars(strip_tags($this->province));
            $this->profile = htmlspecialchars(strip_tags($this->profile));
            $this->ip = htmlspecialchars(strip_tags($this->ip));
            $this->originUrl = htmlspecialchars(strip_tags($this->originUrl));
            $this->source = htmlspecialchars(strip_tags($this->source));
            $this->date = date('Y-m-d H:i:s');

            // Bind de parámetros
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":phone", $this->phone);
            $stmt->bindParam(":comments", $this->comments);
            $stmt->bindParam(":surface", $this->surface);
            $stmt->bindParam(":province", $this->province);
            $stmt->bindParam(":profile", $this->profile);
            $stmt->bindParam(":ip", $this->ip);
            $stmt->bindParam(":originUrl", $this->originUrl);
            $stmt->bindParam(":source", $this->source);
            $stmt->bindParam(":date", $this->date);

            // Ejecutar query
            if ($stmt->execute()) {
                $this->id = $this->conn->lastInsertId();
                return true;
            }

            return false;
        } catch (PDOException $e) {
            error_log("Error al crear contacto: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Lee un contacto por ID
     * @return bool
     */
    public function readOne()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 1";

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->id);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                $this->name = $row['name'];
                $this->email = $row['email'];
                $this->phone = $row['phone'];
                $this->comments = $row['comments'];
                $this->surface = $row['surface'];
                $this->province = $row['province'];
                $this->profile = $row['profile'];
                $this->ip = $row['ip'];
                $this->originUrl = $row['originUrl'];
                $this->source = $row['source'];
                $this->date = $row['date'];

                return true;
            }

            return false;
        } catch (PDOException $e) {
            error_log("Error al leer contacto: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Lee todos los contactos con paginación opcional
     * @param int $from Inicio
     * @param int $records_per_page Registros por página
     * @return array|false
     */
    public function readAll($from = 0, $records_per_page = 10)
    {
        $query = "SELECT * FROM " . $this->table_name . " 
                  ORDER BY date DESC 
                  LIMIT ?, ?";

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $from, PDO::PARAM_INT);
            $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error al leer contactos: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Cuenta el total de registros
     * @return int
     */
    public function count()
    {
        $query = "SELECT COUNT(*) as total FROM " . $this->table_name;

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            return $row['total'];
        } catch (PDOException $e) {
            error_log("Error al contar contactos: " . $e->getMessage());
            return 0;
        }
    }

    /**
     * Busca contactos por email
     * @param string $email
     * @return array|false
     */
    public function findByEmail($email)
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = ? ORDER BY date DESC";

        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $email);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error al buscar por email: " . $e->getMessage());
            return false;
        }
    }
}
