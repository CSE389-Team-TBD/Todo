package com.cse389.tbd.controller;

import com.cse389.tbd.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.google.cloud.firestore.DocumentSnapshot;

@RestController
@RequestMapping("/users")
public class UserController {

    private static final String COLLECTION_NAME = "users";

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            // Check if username or email already exists
            ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME)
                    .whereEqualTo("username", user.getUsername()).get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            if (!documents.isEmpty()) {
                return ResponseEntity.badRequest().body("Username already exists.");
            }

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            DocumentReference docRef = db.collection(COLLECTION_NAME).document();
            user.setId(docRef.getId());
            docRef.set(user);
            return ResponseEntity.ok("User registered successfully!");
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            return ResponseEntity.status(500).body("Server error. Please try again later.");
        }
    }

    // Login a user
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> credentials) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            String username = credentials.get("username");
            String rawPassword = credentials.get("password");

            ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME)
                    .whereEqualTo("username", username).get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            if (documents.isEmpty()) {
                return ResponseEntity.status(401).body("Invalid username or password.");
            }

            DocumentSnapshot document = documents.get(0);
            String storedHashedPassword = document.getString("password");
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            if (!passwordEncoder.matches(rawPassword, storedHashedPassword)) {
                return ResponseEntity.status(401).body("Invalid username or password.");
            }

            return ResponseEntity.ok("Login successful!");
        } catch (ExecutionException | InterruptedException e) {
            Thread.currentThread().interrupt();
            return ResponseEntity.status(500).body("Server error. Please try again later.");
        }
    }
}
