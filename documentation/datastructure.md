# Models

## Customer
```
{
  "_id": "oid1",
  "name": "Justin Zondagh"
}

{
  "_id": "oid2",
  "name": "Bokmakierie Holdings (Pty) Ltd"
}
```


## Environment

An environment is used to create a virtual space where Entities and Users can be stored. A customer can have n number of environments. All data is stored against an environment.

Permissions are also specified by environment.

```
{
  "_id": "oid7",
  "name": "Three Sprints,
  "slug": "three-sprints",
  "customer_id": "oid1"
}

{
  "_id": "oid5",
  "name": "Bokmakierie - Western Cape",
  "slug": "bokmakierie-western-cape",
  "customer_id": "oid2"
}

{
  "_id": "oid6",
  "name": "Bokmakierie - Eastern Cape",
  "slug": "bokmakierie-eastern-cape",
  "customer_id": "oid2"
}
```

## User

A Customer can have many Users but a User belongs to one Customer. This is their "home" customer and where they will derive their licence from.

Users is assigned access to an Environment and is assigned one or more roles:
- owner
- writer
- viewer

```
{
  "_id": "oid3",
  "name": "Justin Zondagh",
  "email": "justin@threesprints.com",
  "customer_id": "oid1",
  "environments": {
    "three-sprints": {
      "roles": [
        "owner", "writer"
      ]
    },
    "bokmakierie-eastern-cape": {
      "roles": [
        "writer"
      ]
    },
    "bokmakierie-western-cape": {
      "roles": [
        "viewer"
      ]
    }
  }
}

{
  "_id": "oid4",
  "name": "Riaan Strydom",
  "email": "riaan@bokmakierie.co.za",
  "customer_id": "oid2",
  "environments": {
    "bokmakierie-western-cape": {
      "roles": [
        "owner", "writer"
      ]
    },
    "bokmakierie-eastern-cape": {
      "roles": [
        "owner", "writer"
      ]
    }
  }
}
```

## Network Type



## Network Provider

```
{
  "_id": "oid90",
  "name": "The Things Network",
  "slug": "the-things-network"
},
{
  "_id": "oid91",
  "name": "RSAWEB",
  "slug": "rsaweb"
},
{
  "_id": "oid92",
  "name": "Thing Stream",
  "slug": "thing-stream"
}

```

## Network

Networks will be of a certain type. We will currently support:
- lorawan
- gsm
- ip
- ussd
- mqtt

The network_type can be an enum.

```
{
  "_id": "oid80",
  "name": "TTN LoRaWAN",
  "slug": "the-things-network",
  "network_provider_id": "oid90",
  "network_type": "lorawan"
},
{
  "_id": "oid81",
  "name": "RSAWEB LoRaWAN",
  "slug": "rsaweb",
  "network_provider_id": "oid91",
  "network_type": "lorawan"
},
{
  "_id": "oid81",
  "name": "RSAWEB Mobile",
  "slug": "rsaweb",
  "network_provider_id": "oid91",
  "network_type": "gsm"
}
```


## Entity Type

Entity Types can be set at a global level or per environment.

```

{
  "_id": "oid100",
  "name": "Room",
  "is_movable": false
},
{
  "_id": "oid101",
  "name": "Vehicle",
  "is_movable": true
},
{
  "_id": "oid102",
  "name": "Coldroom",
  "is_movable": true
},
{
  "_id": "oid103",
  "name": "Sheep",
  "is_movable": true,
  "environment_id": "oid6"
},
{
  "_id": "oid104",
  "name": "Building",
  "is_movable": false
},
{
  "_id": "oid105",
  "name": "Generic",
  "is_movable": false
},
```

## Entity

An Entity is used to define organisational structure within an Environment and one of more Devices can be associated with an Entity which is where an Entity will source it's data from.

Devices can move between Entities over time which we will deal with in the Devices section below.

```
{
  "_id": "oid200",
  "name": "Office Building",
  "environment_id": "oid7",
  "entity_type_id": "oid104", #building
  "parent_entity_id": null,
  "ancestors": []
},
{
  "_id": "oid201",
  "name": "RSAWEB Office",
  "environment_id": "oid7",
  "entity_type_id": "oid105", #generic
  "parent_entity_id": "oid200",
  "ancestors": ["oid200"]
},
{
  "_id": "oid202",
  "name": "Rock Boardroom",
  "environment_id": "oid7",
  "entity_type_id": "oid100", #room
  "parent_entity_id": "oid201",
  "ancestors": ["oid201", "oid200"]
}
```

## Device Manufacturer

The manufacturer of a Device. These will be set globally and by Three Sprints for now.

```
{
  "_id": "oid400",
  "name": "Elsys"
},
{
  "_id": "oid401",
  "name": "RAK Wireless"
},
{
  "_id": "oid402",
  "name": "Three Sprints"
}

```

## Device Tag
These will be set globally

```
{
  "_id": "oid500",
  "name": "Temperature",
  "slug": "temperature"
},
{
  "_id": "oid501",
  "name": "Humidity",
  "slug": "humidity"
},
{
  "_id": "oid502",
  "name": "Passive Infrared",
  "slug": "pir"
}

```


## Device Model

```
{
  "_id": "oid600",
  "name": "ERS",
  "manufacturer_id": "oid400",
  "tags": ["temperature", "humidity"],
  "network_types": ["lorawan"]
},
{
  "_id": "oid601",
  "name": "ERS Eye",
  "manufacturer_id": "oid400",
  "tags": ["temperature", "humidity", "pir"],
  "network_types": ["lorawan"]
}

```

## Device

```
{



}
```
