package com.cse389.tbd.repository;

import com.cse389.tbd.model.Todo;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
}
