import type React from "react";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Errors,
  Phone,
  PhoneType,
  UserData,
} from "@/interfaces/user.interface";
import { countries } from "@/helpers/countries";

export default function Configurations() {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    dni: "",
    birth_date: "",
    first_name: "",
    last_name: "",
    country: "",
    nationality: "",
    province: "",
    read_qr: 0,
  });

  const [phones, setPhones] = useState<Phone[]>([
    {
      country_code: "",
      area_code: "",
      phone_number: "",
      type: "personal",
    },
  ]);

  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserData({
      ...userData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setUserData({
      ...userData,
      read_qr: checked ? 1 : 0,
    });
  };

  const handlePhoneChange = (
    index: number,
    field: keyof Phone,
    value: string
  ) => {
    const updatedPhones = [...phones];
    updatedPhones[index] = {
      ...updatedPhones[index],
      [field]: value,
    };
    setPhones(updatedPhones);
  };

  const addPhone = () => {
    setPhones([
      ...phones,
      {
        country_code: "",
        area_code: "",
        phone_number: "",
        type: "personal",
      },
    ]);
  };

  const removePhone = (index: number) => {
    if (phones.length > 1) {
      const updatedPhones = [...phones];
      updatedPhones.splice(index, 1);
      setPhones(updatedPhones);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!userData.email || !userData.email.includes("@")) {
      newErrors.email = "Email inválido";
    }

    if (!userData.dni || userData.dni.length < 7) {
      newErrors.dni = "DNI inválido";
    }

    if (!userData.first_name) {
      newErrors.first_name = "Nombre requerido";
    }

    if (!userData.last_name) {
      newErrors.last_name = "Apellido requerido";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Datos enviados:", { ...userData, phones });
      alert("Datos guardados correctamente");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Configuración de Usuario</CardTitle>
          <CardDescription>
            Actualiza tu información personal y datos de contacto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información básica */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dni">DNI</Label>
                <Input
                  id="dni"
                  name="dni"
                  value={userData.dni}
                  onChange={handleInputChange}
                  className={errors.dni ? "border-red-500" : ""}
                />
                {errors.dni && (
                  <p className="text-red-500 text-sm">{errors.dni}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="first_name">Nombre</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleInputChange}
                  className={errors.first_name ? "border-red-500" : ""}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">{errors.first_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Apellido</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleInputChange}
                  className={errors.last_name ? "border-red-500" : ""}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">{errors.last_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="birth_date">Fecha de Nacimiento</Label>
                <Input
                  id="birth_date"
                  name="birth_date"
                  type="date"
                  value={userData.birth_date}
                  onChange={handleInputChange}
                  className={errors.birth_date ? "border-red-500" : ""}
                />
                {errors.birth_date && (
                  <p className="text-red-500 text-sm">{errors.birth_date}</p>
                )}
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select
                  value={userData.role}
                  onValueChange={(value) => handleSelectChange("role", value)}
                >
                  <SelectTrigger
                    className={errors.role ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="guest">Invitado</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role}</p>
                )}
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Select
                  value={userData.country}
                  onValueChange={(value) =>
                    handleSelectChange("country", value)
                  }
                >
                  <SelectTrigger
                    className={errors.country ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Selecciona un país" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name} ({country.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nacionalidad</Label>
                <Select
                  value={userData.nationality}
                  onValueChange={(value) =>
                    handleSelectChange("nationality", value)
                  }
                >
                  <SelectTrigger
                    className={errors.nationality ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Selecciona una nacionalidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name} ({country.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.nationality && (
                  <p className="text-red-500 text-sm">{errors.nationality}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Provincia</Label>
                <Input
                  id="province"
                  name="province"
                  value={userData.province}
                  onChange={handleInputChange}
                  className={errors.province ? "border-red-500" : ""}
                />
                {errors.province && (
                  <p className="text-red-500 text-sm">{errors.province}</p>
                )}
              </div>

              <div className="space-y-2 flex items-center">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="read_qr">Leer QR</Label>
                  <Switch
                    checked={
                      userData.read_qr === 1 || userData.read_qr === true
                    }
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Teléfonos</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPhone}
                  className="cursor-pointer"
                >
                  <Plus className="h-4 w-4 mr-2" /> Agregar teléfono
                </Button>
              </div>

              <Separator />

              {phones.map((phone, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end p-4 border rounded-md"
                >
                  <div className="flex flex-col gap-2">
                    <Label>Código país</Label>
                    <Input
                      value={phone.country_code}
                      onChange={(e) =>
                        handlePhoneChange(index, "country_code", e.target.value)
                      }
                      placeholder="+54"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Código área</Label>
                    <Input
                      value={phone.area_code}
                      onChange={(e) =>
                        handlePhoneChange(index, "area_code", e.target.value)
                      }
                      placeholder="351"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Número</Label>
                    <Input
                      value={phone.phone_number}
                      onChange={(e) =>
                        handlePhoneChange(index, "phone_number", e.target.value)
                      }
                      placeholder="7363237"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Tipo</Label>
                    <Select
                      value={phone.type}
                      onValueChange={(value) =>
                        handlePhoneChange(index, "type", value as PhoneType)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="work">Trabajo</SelectItem>
                        <SelectItem value="emergency">Emergencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removePhone(index)}
                    disabled={phones.length <= 1}
                    className="cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="cursor-pointer">
                Guardar cambios
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
