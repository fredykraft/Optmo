/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const usersCollection = app.findCollectionByNameOrId("users")

  const userProfilesCollection = new Collection({
    "type": "base",
    "name": "user_profiles",
    "listRule": "user = @request.auth.id",
    "viewRule": "user = @request.auth.id",
    "createRule": "user = @request.auth.id",
    "updateRule": "user = @request.auth.id",
    "deleteRule": "user = @request.auth.id",
    "fields": [
      {
        "name": "user",
        "type": "relation",
        "required": true,
        "collectionId": usersCollection.id,
        "maxSelect": 1,
        "cascadeDelete": true
      },
      {
        "name": "display_name",
        "type": "text",
        "max": 120
      },
      {
        "name": "full_name",
        "type": "text",
        "max": 200
      },
      {
        "name": "company",
        "type": "text",
        "max": 200
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX idx_user_profiles_user ON user_profiles (user)"
    ]
  })
  app.save(userProfilesCollection)

  const projectsCollection = new Collection({
    "type": "base",
    "name": "projects",
    "listRule": "user = @request.auth.id",
    "viewRule": "user = @request.auth.id",
    "createRule": "user = @request.auth.id",
    "updateRule": "user = @request.auth.id",
    "deleteRule": "user = @request.auth.id",
    "fields": [
      {
        "name": "user",
        "type": "relation",
        "required": true,
        "collectionId": usersCollection.id,
        "maxSelect": 1,
        "cascadeDelete": true
      },
      {
        "name": "name",
        "type": "text",
        "required": true,
        "max": 150
      },
      {
        "name": "category",
        "type": "text",
        "max": 80
      },
      {
        "name": "description",
        "type": "text",
        "max": 1000
      }
    ],
    "indexes": [
      "CREATE INDEX idx_projects_user ON projects (user)"
    ]
  })
  app.save(projectsCollection)

  const eventsCollection = new Collection({
    "type": "base",
    "name": "user_events",
    "listRule": "user = @request.auth.id",
    "viewRule": "user = @request.auth.id",
    "createRule": "user = @request.auth.id",
    "updateRule": null,
    "deleteRule": "user = @request.auth.id",
    "fields": [
      {
        "name": "user",
        "type": "relation",
        "required": true,
        "collectionId": usersCollection.id,
        "maxSelect": 1,
        "cascadeDelete": true
      },
      {
        "name": "event_type",
        "type": "text",
        "required": true,
        "max": 80
      },
      {
        "name": "event_data",
        "type": "json"
      },
      {
        "name": "source",
        "type": "text",
        "max": 60
      }
    ],
    "indexes": [
      "CREATE INDEX idx_user_events_user ON user_events (user)",
      "CREATE INDEX idx_user_events_type ON user_events (event_type)"
    ]
  })
  app.save(eventsCollection)
}, (app) => {
  const collectionsToDelete = ["user_events", "projects", "user_profiles"]

  for (const name of collectionsToDelete) {
    try {
      const collection = app.findCollectionByNameOrId(name)
      app.delete(collection)
    } catch (_) {
    }
  }
})
