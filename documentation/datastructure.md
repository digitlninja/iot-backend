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
  "environment_slug": "bokmakierie-western-cape"
}
```

## Entity

```

```


## Device Manufacturer

## Device Model

## Device
